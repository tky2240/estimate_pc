use axum::extract::rejection::*;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::response::Response;
use sea_orm::DbErr;
use std::convert::From;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum SearchError {
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
    DataBaseError(#[from] DbErr),
    #[error(transparent)]
    Other(#[from] anyhow::Error),
}

impl IntoResponse for SearchError {
    fn into_response(self) -> Response {
        match self {
            SearchError::ConTentTypeIsNotJson(_) => (
                StatusCode::BAD_REQUEST,
                "Content-Type is not application/json",
            ),
            SearchError::RequestPayloadIsNull => (StatusCode::BAD_REQUEST, "Json is null"),
            SearchError::RequestPayloadInvalidData(_) => (
                StatusCode::BAD_REQUEST,
                "Requested payload cannot parse with invalid data",
            ),
            SearchError::RequestPayloadInvalidSyntax(_) => (
                StatusCode::BAD_REQUEST,
                "Requested payload cannot parse with invalid syntax",
            ),
            SearchError::ReadBytesError(_) => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Read bytes error")
            }
            SearchError::DataBaseError(_) => (StatusCode::INTERNAL_SERVER_ERROR, "Database error"),
            SearchError::Other(_) => (StatusCode::INTERNAL_SERVER_ERROR, "UnExpected Error"),
        }
        .into_response()
    }
}

impl From<JsonRejection> for SearchError {
    fn from(json_rejection: JsonRejection) -> Self {
        match json_rejection {
            JsonRejection::BytesRejection(bytes_rejection) => {
                SearchError::ReadBytesError(bytes_rejection)
            }
            JsonRejection::JsonDataError(json_data_error) => {
                SearchError::RequestPayloadInvalidData(json_data_error)
            }
            JsonRejection::JsonSyntaxError(json_syntax_error) => {
                SearchError::RequestPayloadInvalidSyntax(json_syntax_error)
            }
            JsonRejection::MissingJsonContentType(missing_json_content_type) => {
                SearchError::ConTentTypeIsNotJson(missing_json_content_type)
            }
            _ => SearchError::Other(anyhow::anyhow!("unexpected error in parse json")),
        }
    }
}

impl From<SearchError> for Response {
    fn from(error: SearchError) -> Self {
        error.into_response()
    }
}
