import Separator from "../Separator";
import GetStatistic from "./GetStatistic";

let response ={
    userId:1,
    userUuid:"jyttdhjkl;",
    registrationTime: "2017-01-26",
    lastVisitTime: "2017-01-26",

    isDeleted:false,
    isBanned:false,
    isActive:false,

    commentsCount:2,
    postsHeadsAndIds:[{value:1, label:"head 1"},{value:2, label:"head 2"}]
}

const ResponseMapper =() =>{
    return (
        <div>
            <Separator.Separator4/>
            <div className={"jumbotron bg-light"}>
                <h4 className={"text-center"}>Statistic</h4>
                {[response].map(GetStatistic)}
            </div>
        </div>
    );
}

const StatisticUser = () => {
  return (
      <div className="jumbotron">
          <h4>User statistic</h4>
          <hr/>
          <div className="form-group">
              <input type="text" className="form-control w-25" id="inputAddress" placeholder={"User id"}/>
          </div>
          <hr/>
          <div className={"float-right"}>
              <button type="button" className="btn btn-outline-dark">Clear result</button>
              <button type="button" className="btn btn-outline-dark border-0" disabled> </button>
              <button type="button" className="btn btn-outline-info">Get statistic</button>
          </div>
          <ResponseMapper/>
      </div>
  );
}

export default StatisticUser;