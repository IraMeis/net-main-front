import SearchPattern from "./SearchPattern"
import PostUtil from "../notes/post/post.util";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import StatisticService from "../../../../services/statistic.service";

const FilterPost = () => {

    const ResponseMapper = () => {
        return (<PostUtil.GetSearchPostWithParams resp={resp} f={handleState}/>);
    }

    function handleState(e){
        setResp(e);
    }

    const [dfrom, setDfrom] = useState();
    const onChangeDfrom = (e) => {
        const content = e.target.value;
        setDfrom(content);
    };
    const [dto, setDto] = useState();
    const onChangeDto = (e) => {
        const content = e.target.value;
        setDto(content);
    };

    const [label, setLabel] = useState("");
    const onChangeLabel = (e) => {
        const content = e.target.value;
        setLabel(content);
    };
    const [inh, setInh] = useState(true);
    const onChangeInh = () => {
        setInh(!inh);
    };
    const [inmc, setInmc] = useState(true);
    const onChangeInmc = () => {
        setInmc(!inmc);
    };
    const [incoment, setIncoment] = useState(false);
    const onChangeComent = () => {
        setIncoment(!incoment);
    };

    const [comIds, setComIds] = useState("");
    const onChangeComIds = (e) => {
        const content = e.target.value;
        setComIds(content);
    };

    const [pr1, setPr1] = useState(true);
    const onChangePr1 = () => {
        setPr1(!pr1);
    };
    const [pr2, setPr2] = useState(true);
    const onChangePr2 = () => {
        setPr2(!pr2);
    };
    const [pr3, setPr3] = useState(true);
    const onChangePr3 = () => {
        setPr3(!pr3);
    };
    const [pr4, setPr4] = useState(true);
    const onChangePr4 = () => {
        setPr4(!pr4);
    };

    const makeSearchRequest = () => {
      let list = [];

      const formatter = (date, sep) => {
          let mas = [date.substring(8, 10), date.substring(5, 7), date.substring(0, 4)];
          return mas.join(sep);
      }

      if(dfrom != null)
          list.push("from=" + formatter(dfrom.toString(), "."));
      if(dto != null)
          list.push("to=" + formatter(dto.toString(), "."));
      if(label !== "") {
          list.push("label=" + label)
          if(!inh && !incoment && !inmc) {
              onChangeInmc();
              onChangeInh();
              onChangeComent();
              list.push("inHead=true")
              list.push("inContent=true")
              list.push("inComments=true")
          }
          else{
              list.push("inHead=" + inh.toString())
              list.push("inContent=" + inmc.toString())
              list.push("inComments=" + incoment.toString())
          }
      }
      if(comIds!=="")
          list.push("commentatorIds=" + comIds)
      if(!pr1 && !pr2 && !pr3 && !pr4){}
      else{
          let comids = [];
          if(pr1) comids.push("1");
          if(pr2) comids.push("2");
          if(pr3) comids.push("3");
          if(pr4) comids.push("4");
          list.push("scopes=" + comids.join(','));
      }
      let filter = list.join("&");
      return "?" + filter;
    }

    const [isShow, setIsShow] = useState(false);
    const [resp, setResp] = useState([]);
    const [isErr, setIsErr] = useState(false);

    const handleClear = () => {
        setResp([]);
        setIsShow(false);
    }

    const handleFilter = () => {
        StatisticService.getFilterPost(makeSearchRequest())
            .then(
                (response) => {
                    setResp(response.data);
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

            <h4>Post search</h4>
            <hr/>

            <SearchPattern.FromAndTo
                label="Search by creating date"
                chfrom ={onChangeDfrom}
                chto={onChangeDto}
            />
            <hr/>

            <SearchPattern.TextSimple
                label="Search by text containing"
                ph="label"
                chl={onChangeLabel}
            />
            <SearchPattern.CheckBox3
                id="1"
                l1={"in header"} l2={"in main content"} l3={"in comments"}
                inh={inh} inmc ={inmc} incoms={incoment}
                chinh={onChangeInh} chinmc={onChangeInmc} chincoment={onChangeComent}
            />
            <hr/>

            <SearchPattern.TextSimple
                label="Search by commentators ids"
                ph="ex. 1,23,5"
                chl={onChangeComIds}
            />
            <hr/>

            <SearchPattern.ScopeCheckBox
                chp1={onChangePr1} chp2={onChangePr2} chp3={onChangePr3} chp4={onChangePr4}
                p1={pr1} p2={pr2} p3={pr3} p4={pr4}
            />
            <hr/>

            <SearchPattern.SearchButton
                filter={handleFilter} clear={handleClear}
            />

            {isShow && <ResponseMapper/>}
        </div>
    );
}

export default FilterPost;