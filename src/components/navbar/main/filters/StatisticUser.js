import Separator from "../Separator";
import GetStatistic from "./GetStatistic";
import React, {useState} from "react";
import StatisticService from "../../../../services/statistic.service";
import {Navigate} from "react-router-dom";

const StatisticUser = () => {

    const ResponseMapper = () => {
        return (
            <div>
                <Separator.Separator4/>
                <div className={"jumbotron bg-light"}>
                    <h4 className={"text-center"}>Statistic</h4>
                    {resp.map(GetStatistic)}
                </div>
            </div>
        );
    }

    const [isShow, setIsShow] = useState(false);
    const [resp, setResp] = useState([]);
    const [isErr, setIsErr] = useState(false);

    const [id, setId] = useState("");
    const onChangeId = (e) => {
        const content = e.target.value;
        setId(content);
    };

    const handleClear = () => {
        setResp([]);
        setIsShow(false);
    }

    const handleFilter = () => {
        //console.log(makeSearchRequest())
        //setIsShow(true);
        StatisticService.getUserStatistic(id)
            .then(
                (response) => {
                    setResp([response.data]);
                    setIsShow(true);
                })
            .catch(
                (error) => {
                    setIsErr(true);
                    localStorage.setItem("error", JSON.stringify(error.message));
                });
    };

    if(isErr===true)
        return <Navigate to="/error" />

  return (
      <div className="jumbotron">
          <h4>User statistic</h4>
          <hr/>
          <div className="form-group">
              <input type="text"
                     className="form-control w-25"
                     id="inputAddress"
                     placeholder={"User id"}
                     onChange={onChangeId}
              />
          </div>
          <hr/>
          <div className={"float-right"}>
              <button type="button"
                      className="btn btn-outline-dark"
                      onClick={handleClear}
              >
                  Clear result</button>
              <button type="button" className="btn btn-outline-dark border-0" disabled> </button>
              <button type="button"
                      className="btn btn-outline-info"
                      onClick={handleFilter}
              >
                  Get statistic</button>
          </div>
          {isShow && <ResponseMapper/>}
      </div>
  );
}

export default StatisticUser;