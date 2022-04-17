import SearchPattern from "./SearchPattern"

const StatisticUser = () => {
  return (
      <div className="jumbotron">
          <h4>User statistic</h4>
          <hr/>
          <div className="form-group">
              <input type="text" className="form-control w-25" id="inputAddress" placeholder={"User id"}/>
          </div>
          <hr/>
          <button type="submit" className="btn btn-outline-info float-right">Get statistic</button>
      </div>
  );
}

export default StatisticUser;