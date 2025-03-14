import { SerializedError } from "@reduxjs/toolkit";

type ErrorDisplayProps = {
  status: string;
  error: string;
}

export const ErrorDisplay = ({ status, error }: ErrorDisplayProps) => {
  return (
    <div className="alert alert-danger text-center my-4" role="alert">
      <h4 className="alert-heading">{status}</h4>
      <p>{error}</p>
      <hr />
      <p className="mb-0">Please try refreshing the page or contact support if the issue persists.</p>
    </div>
  );
};


export const SerializedErrorDisplay = ({name, message, stack, code}: SerializedError) => {
  return (
    <div className="alert alert-danger text-center my-4" role="alert">
      <h4 className="alert-heading">{name}</h4>
      <p>{message}</p>
      <hr />
      <p className="mb-0">Please try refreshing the page or contact support if the issue persists.</p>
    </div>
  );
};
