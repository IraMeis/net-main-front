import SearchPattern from "./SearchPattern"
import Separator from "../Separator";
import SearchUser from "./SearchUser";

/*


    private String about;
    private String login;
    private Boolean isActive;
    private Boolean isUser;
    private Collection<Pair> roles;

 */

let response =[{
        id:1,
        uuid:"jyttdhjkl;",
        createdTimestamp: "2017-01-26",
        modifiedTimestamp: "2017-01-26",
        isDeleted:false,
        isTokenAllowed:true,

        login:"testlogin",
        about:null,
        isActive:false,
        isUser:false,

        scope:{value:2, label:"private"},
        roles:[{value:1, label:"system"},{value:2, label:"post_modifier"}]
},
        {
                id:1,
                uuid:"jyttdhjkl;",
                createdTimestamp: "2017-01-26",
                modifiedTimestamp: "2017-01-26",
                isDeleted:false,
                isTokenAllowed:true,

                login:"testlogin",
                about:null,
                isActive:false,
                isUser:false,

                scope:{value:2, label:"private"},
                roles:[{value:1, label:"system"},{value:2, label:"post_modifier"}]
        },
        {
                id:1,
                uuid:"jyttdhjkl;",
                createdTimestamp: "2017-01-26",
                modifiedTimestamp: "2017-01-26",
                isDeleted:false,
                isTokenAllowed:true,

                login:"testlogin",
                about:null,
                isActive:false,
                isUser:false,

                scope:{value:2, label:"private"},
                roles:[{value:1, label:"system"},{value:2, label:"post_modifier"}]
        }]

const ResponseMapper =() =>{
        return (
            <div>
                    <Separator.Separator4/>
                    <div className={"jumbotron bg-light"}>
                            <h4 className={"text-center"}>Search result</h4>
                            {response.map(SearchUser)}
                    </div>
            </div>
        );
}

const FilterUser = () => {

    return (
        <div className="jumbotron">

            <h4>User search</h4>
            <hr/>

            <SearchPattern.FromAndTo label="Search by registration date"/>
            <hr/>

            <SearchPattern.TextSimple label="Search by login containing" ph="label"/>
            <hr/>

            <SearchPattern.ScopeCheckBox/>
            <hr/>

            <SearchPattern.Radio3Labeled label={"Search by isDeleted"} id={"2"}
                                            l1={"only in not deleted"} l2={"only in deleted"} l3={"no mater"}/>
            <hr/>

            <SearchPattern.Radio3Labeled label={"Search by isUser"} id={"3"}
                                            l1={"only in user accounts"} l2={"only in not-user accounts"} l3={"no mater"}/>
            <hr/>

            <SearchPattern.CheckBox1Labeled label={"Search in active at current time"} id="4"
                                            l1={"yes"}/>
            <hr/>

            <SearchPattern.SearchButton/>

            <ResponseMapper/>
        </div>
    );
}

export default FilterUser;