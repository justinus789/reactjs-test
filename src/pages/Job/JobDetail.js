/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const JobDetail = () => {
  const { id } = useParams();
  const { setProfile, setProvider } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [jobDetail, setJobDetail] = useState(null);

  const fetchJobDetail = async () => {
    try {
      const { data } = await axios.get(`/recruitment/positions/${id}`);

      setJobDetail(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setProvider(Cookies.get("provider"));
    setProfile(JSON.parse(Cookies.get("profile")));
  }, []);

  useEffect(() => {
    if (isLoading) {
      fetchJobDetail();
    }
  }, [isLoading]);

  console.log(jobDetail);

  return (
    <div className="p-8">
      <button
        type="button"
        className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        onClick={() => navigate("/jobs")}
      >
        Back to Jobs List
      </button>

      <section className="p-4 my-6 border border-box bg-sky-50 rounded-lg shadow-md">
        {isLoading ? (
          <p className="text-lg font-bold p-4">Loading...</p>
        ) : (
          jobDetail && (
            <>
              <p className="text-xl">
                {jobDetail.type} / {jobDetail.location}{" "}
              </p>
              <p className="text-2xl font-bold mb-5"> {jobDetail.title} </p>

              <hr className="my-4 border-solid border-2 border-sky-300" />
              <div className="grid grid-cols-6 gap-4">
                <div
                  className="col-start-1 col-span-4"
                  dangerouslySetInnerHTML={{ __html: jobDetail.description }}
                />
                <div className="col-start-5 col-end-7">
                  <section className="w-full p-4 border border-box bg-sky-100 rounded-lg shadow-md">
                    <p className="text-md font-bold">{jobDetail.company} </p>
                    <hr className="my-2 border-solid border-2 border-sky-300" />
                    {jobDetail.company_logo && (
                      <img src={jobDetail.company_logo} alt="" />
                    )}
                    <a
                      href={jobDetail.url}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {jobDetail.url}
                    </a>
                  </section>

                  <section className="w-full p-4 mt-6 border border-box bg-yellow-100 rounded-lg shadow-md">
                    <p className="text-md font-bold">How to apply </p>
                    <hr className="my-2 border-solid border-2 border-yellow-500" />

                    <p
                      dangerouslySetInnerHTML={{
                        __html: jobDetail.how_to_apply,
                      }}
                    ></p>
                  </section>
                </div>
              </div>
            </>
          )
        )}
      </section>
    </div>
  );
};

export default JobDetail;
