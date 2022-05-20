import SearchPattern from "./SearchPattern"
import Separator from "../Separator";
import SearchUser from "./SearchUser";
import React, {useState} from "react";
import StatisticService from "../../../../services/statistic.service";
import {Navigate} from "react-router-dom";

const FilterUser = () => {

        const ResponseMapper =() =>{
                return (
                    <div>
                            <Separator.Separator4/>
                            <div className={"jumbotron bg-light"}>
                                    <h4 className={"text-center"}>Search result</h4>
                                    {resp.length === 0 ?
                                        <p className={"text-center"}>No content with current search parameters found</p> :
                                        resp.map(SearchUser)}
                            </div>
                    </div>
                );
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

        const [valueDEl, setValueDEL] = useState('3');
        const chengeValueDEL = (e) => {
                setValueDEL(e.target.value);
        };

        const [valueISU, setValueISU] = useState('3');
        const chengeValueISU = (e) => {
                setValueISU(e.target.value);
        };

        const [valueACT, setValueACT] = useState('3');
        const chengeValueACT = (e) => {
                setValueACT(e.target.value);
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
                if(label !== "")
                        list.push("label=" + label)
                if(!pr1 && !pr2 && !pr3 && !pr4){}
                else{
                        let comids = [];
                        if(pr1) comids.push("1");
                        if(pr2) comids.push("2");
                        if(pr3) comids.push("3");
                        if(pr4) comids.push("4");
                        list.push("scopes=" + comids.join(','));
                }

                if(valueDEl=='1')
                        list.push("isDeleted=false");
                else if (valueDEl=='2')
                        list.push("isDeleted=true");

                if(valueISU=='1')
                        list.push("isUser=true");
                else if (valueISU=='2')
                        list.push("isUser=false");

                if(valueACT=='1')
                        list.push("isActive=true");
                else if (valueACT=='2')
                        list.push("isActive=false");

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
                //console.log(makeSearchRequest())
                //setIsShow(true);
                StatisticService.getFilterUser(makeSearchRequest())
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

            <h4>User search</h4>
            <hr/>

                <SearchPattern.FromAndTo
                    label="Search by registration date"
                    chfrom ={onChangeDfrom}
                    chto={onChangeDto}
                />
                <hr/>

                <SearchPattern.TextSimple
                    label="Search by login containing"
                    ph="label"
                    chl={onChangeLabel}
                />

                <SearchPattern.ScopeCheckBox
                    chp1={onChangePr1} chp2={onChangePr2} chp3={onChangePr3} chp4={onChangePr4}
                    p1={pr1} p2={pr2} p3={pr3} p4={pr4}
                />
            <hr/>

            <SearchPattern.Radio3Labeled label={"Search by isDeleted"} id={"2"}
                                            l1={"only in not deleted"} l2={"only in deleted"} l3={"no mater"}
                                         ch={chengeValueDEL} chval={valueDEl}
            />
            <hr/>

            <SearchPattern.Radio3Labeled label={"Search by isUser"} id={"3"}
                                            l1={"only in user accounts"} l2={"only in not-user accounts"} l3={"no mater"}
                                         ch={chengeValueISU} chval={valueISU}
            />
            <hr/>

            <SearchPattern.Radio3Labeled label={"Search in active at current time"} id="4"
                                         l1={"only in active"} l2={"only in not active"} l3={"no mater"}
                                         ch={chengeValueACT} chval={valueACT}
            />
            <hr/>

                <SearchPattern.SearchButton
                    filter={handleFilter} clear={handleClear}
                />

                {isShow && <ResponseMapper/>}
        </div>
    );
}

export default FilterUser;