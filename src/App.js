/** @format */

import { useState } from 'react';
import './App.css';
import useFetchjobs from './useFecthJobs';
import { Container } from 'react-bootstrap';
import Job from './Job.jsx';
import JobsPagination from './JobsPagination';
import Search from './Search';

const App = () => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchjobs(params, page);

  const handleParamsChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((pervParams) => {
      return { ...pervParams, [param]: value };
    });
  };

  console.log(jobs.error);
  return (
    <Container className='my-4'>
      <h1 className='mb-4'>GitHub Jobs</h1>
      <Search params={params} onParamsChange={handleParamsChange} />
      {!jobs && (
        <JobsPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
      )}
      {loading && <h1>loading..</h1>}
      {error && <h1>Error.Try to refresh again</h1>}
      {jobs && (
        <>
          <h2>Error:</h2> <h3>{jobs.error}</h3>
        </>
      )}
      {!jobs &&
        jobs.map((job) => {
          return <Job key={job.id} job={job} />;
        })}
      {!jobs && (
        <JobsPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
      )}
    </Container>
  );
};

export default App;
