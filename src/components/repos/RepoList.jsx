import PropTypes from "prop-types";

function RepoList({ repos }) {
  return (
    <div className="rounded-lg shadow-lg card bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl my-4 font-bold card-title">
          {repos.map((repo) => {
            <h3>{repo}</h3>;
          })}
        </h2>
      </div>
    </div>
  );
}

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
};
export default RepoList;
