use axum::extract::rejection::*;
use axum::response::IntoResponse;
use axum::response::Response;
use http::StatusCode;

use serde::{Deserialize, Serialize};

use dotenvy;
use std::env;

use serde_qs;
use thiserror::Error;

use reqwest::Client;

#[derive(Error, Debug)]
pub enum CreateShortUrlError {
    #[error(transparent)]
    ParseParameterError(#[from] serde_qs::Error),
    #[error(transparent)]
    ParseDomainError(#[from] url::ParseError),
    // #[error(transparent)]
    // FailedCreateShortUrl(#[from] ProviderError),
    #[error(transparent)]
    ParseJsonError(#[from] serde_json::Error),
    #[error(transparent)]
    SendRequestError(#[from] reqwest::Error),
    #[error(transparent)]
    ConTentTypeIsNotJson(#[from] MissingJsonContentType),
    #[error("Json is null error")]
    RequestPayloadIsNull,
    #[error(transparent)]
    RequestPayloadInvalidData(#[from] JsonDataError),
    #[error(transparent)]
    RequestPayloadInvalidSyntax(#[from] JsonSyntaxError),
    #[error(transparent)]
    ReadBytesError(#[from] BytesRejection),
    #[error(transparent)]
    Other(#[from] anyhow::Error),
}

impl IntoResponse for CreateShortUrlError {
    fn into_response(self) -> axum::response::Response {
        match self {
            CreateShortUrlError::ParseParameterError(_) => {
                (StatusCode::BAD_REQUEST, "Parse Parameter Error")
            }
            CreateShortUrlError::ParseDomainError(_) => {
                (StatusCode::BAD_REQUEST, "Parse Domain Error")
            }
            // CreateShortUrlError::FailedCreateShortUrl(_) => (
            //     StatusCode::INTERNAL_SERVER_ERROR,
            //     "Failed to Create Short Url",
            // ),
            CreateShortUrlError::ParseJsonError(_) => (
                StatusCode::BAD_REQUEST,
                "Failed to parse link parameter to json",
            ),
            CreateShortUrlError::SendRequestError(_) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "Failed to send request to kutt",
            ),
            CreateShortUrlError::ConTentTypeIsNotJson(_) => (
                StatusCode::BAD_REQUEST,
                "Content-Type is not application/json",
            ),
            CreateShortUrlError::RequestPayloadIsNull => (StatusCode::BAD_REQUEST, "Json is null"),
            CreateShortUrlError::RequestPayloadInvalidData(_) => (
                StatusCode::BAD_REQUEST,
                "Requested payload cannot parse with invalid data",
            ),
            CreateShortUrlError::RequestPayloadInvalidSyntax(_) => (
                StatusCode::BAD_REQUEST,
                "Requested payload cannot parse with invalid syntax",
            ),
            CreateShortUrlError::ReadBytesError(_) => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Read bytes error")
            }
            CreateShortUrlError::Other(_) => (StatusCode::INTERNAL_SERVER_ERROR, "Unknown Error"),
        }
        .into_response()
    }
}

impl From<JsonRejection> for CreateShortUrlError {
    fn from(json_rejection: JsonRejection) -> Self {
        match json_rejection {
            JsonRejection::BytesRejection(bytes_rejection) => {
                CreateShortUrlError::ReadBytesError(bytes_rejection)
            }
            JsonRejection::JsonDataError(json_data_error) => {
                CreateShortUrlError::RequestPayloadInvalidData(json_data_error)
            }
            JsonRejection::JsonSyntaxError(json_syntax_error) => {
                CreateShortUrlError::RequestPayloadInvalidSyntax(json_syntax_error)
            }
            JsonRejection::MissingJsonContentType(missing_json_content_type) => {
                CreateShortUrlError::ConTentTypeIsNotJson(missing_json_content_type)
            }
            _ => CreateShortUrlError::Other(anyhow::anyhow!("unexpected error in parse json")),
        }
    }
}

impl From<CreateShortUrlError> for Response {
    fn from(error: CreateShortUrlError) -> Self {
        error.into_response()
    }
}

#[derive(Serialize, Deserialize)]
pub struct CreateLinkParameter {
    target: String,
    description: Option<String>,
    expire_in: Option<String>,
    password: Option<String>,
    customurl: Option<String>,
    reuse: bool,
    domain: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct CreatedLink {
    address: String,
    banned: bool,
    created_at: Option<String>,
    id: Option<String>,
    link: String,
    password: bool,
    target: Option<String>,
    description: Option<String>,
    updated_at: Option<String>,
    visit_count: i32,
}

pub async fn create_short_url(long_url: String) -> Result<String, CreateShortUrlError> {
    dotenvy::dotenv().ok();
    //let query_parameter_string = serde_qs::to_string(&short_url_parameter)?;
    //let mut domain = Url::parse(&env::var("ESTIMATE_PC_URL").unwrap())?;

    //domain.set_query(Some(&query_parameter_string));
    //let long_url = domain.as_str();

    let key = env::var("KUTT_APIKEY").unwrap();
    let api_url = env::var("KUTT_URL").unwrap();
    let create_link_parameter = CreateLinkParameter {
        target: long_url,
        description: None,
        expire_in: None,
        password: None,
        customurl: None,
        reuse: false,
        domain: None,
    };
    let request = serde_json::to_string(&create_link_parameter)?;
    let response = Client::new()
        .post(api_url)
        .header("X-API-Key", key)
        .header("Content-Type", "application/json")
        .body(request)
        .send()
        .await?
        .text()
        .await?;
    println!("{}", response);
    let created_link = serde_json::from_str::<CreatedLink>(&response)?;
    Ok(created_link.link)
}
