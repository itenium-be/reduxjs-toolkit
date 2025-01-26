export const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="ms-3 mb-0">Mythical Zoos Coming Up...</p>
    </div>
  );
};
