/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

const JobsList = () => {
  const { jobs, setJobs, profile, setProfile, setProvider } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(1);
  const [showMoreJobs, setShowMoreJobs] = useState(false);

  const [searchForm, setSearchForm] = useState({
    description: "",
    location: "",
    full_time: false,
  });
  const [isSearching, setIsSearching] = useState(false);
  const [searchPagination, setSearchPagination] = useState(1);

  const fetchJobList = async () => {
    try {
      if (page === 2) {
        setJobs([]);
        setPage(1);
      }
      setShowMoreJobs(true);

      const { data } = await axios.get(
        `/recruitment/positions.json?page=${pagination}`
      );

      const isLimit = data.some((el) => el === null);

      const job = data.filter((el) => el !== null);

      if (isLimit) {
        setShowMoreJobs(false);
      }

      setJobs((state) => (state.length > 0 ? state.concat(job) : job));
      setPagination((state) => state + 1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const searchJobList = async () => {
    try {
      setShowMoreJobs(true);
      setPagination(1);
      console.log(searchPagination);

      const { data } = await axios.get(
        `/recruitment/positions.json?description=${searchForm.description}&location=${searchForm.location}&full_time=${searchForm.full_time}&page=${searchPagination}`
      );

      const isLimit = data.some((el) => el === null);

      const job = data.filter((el) => el !== null);

      if (isLimit) {
        setShowMoreJobs(false);
      }
      setJobs((state) => (state.length > 0 ? state.concat(job) : job));
      setSearchPagination((state) => state + 1);
      setPage(2);
      setIsSearching(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setProvider(Cookies.get("provider"));
    setProfile(JSON.parse(Cookies.get("profile")));
  }, []);
  console.log(profile);

  useEffect(() => {
    if (isLoading) {
      fetchJobList();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSearching) {
      searchJobList();
    }
  }, [isSearching]);

  const onChange = (e) => {
    let { name, value } = e.target;
    if (name === "full_time") {
      value = e.target.checked === true ? true : false;
    }

    setSearchForm({ ...searchForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setJobs([]);
    setSearchPagination(1);
    setIsSearching(true);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col sm:flex-row gap-4 justify-evenly py-8"
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Jobs description..."
            name="description"
            value={searchForm.description}
            onChange={onChange}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Job Location..."
            name="location"
            value={searchForm.location}
            onChange={onChange}
          />
        </div>

        <div className="flex items-center mt-2">
          <input
            id="default-checkbox"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            name="full_time"
            checked={searchForm.full_time}
            value={searchForm.full_time}
            onChange={onChange}
          />
          <label
            htmlFor="default-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 "
          >
            Full Time Only
          </label>
        </div>

        <button
          type="submit"
          className="block sm:w-28 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
        >
          Search
        </button>
      </form>

      {isLoading || isSearching ? (
        <p className="text-lg font-bold p-4">Loading...</p>
      ) : (
        <div className="px-12">
          <p className="text-center text-2xl my-2 font-bold">
            {page === 1 ? "Job List" : `Showing ${jobs.length} jobs`}
          </p>
          {jobs.map((job, index) => (
            <section
              className="flex justify-between p-6 my-6 border border-box bg-sky-50 rounded-lg shadow-md cursor-pointer"
              key={index}
              onClick={() => {
                navigate(`/jobs/${job.id}`);
              }}
            >
              <div className="text-left">
                <p className="text-lg font-bold text-violet-600">{job.title}</p>
                <p className="text-md">
                  {job.company} -
                  <span className="text-lime-600 font-bold"> {job.type} </span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold">{job.location}</p>
                <p className="text-md">{moment(job.created_at).fromNow()}</p>
              </div>
            </section>
          ))}
        </div>
      )}

      {showMoreJobs && (
        <section className="absolute bottom:0 w-full p-4 text-center">
          <button
            className="w-full p-4 text-white font-bold rounded bg-sky-500"
            onClick={() => {
              page === 1 ? setIsLoading(true) : setIsSearching(true);
            }}
          >
            More Jobs
          </button>
        </section>
      )}
    </>
  );
};

export default JobsList;
