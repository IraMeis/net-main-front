import SearchPattern from "./SearchPattern"
import PostUtil from "../notes/post/post.util";
import Separator from "../Separator";

let response =[{
    id:1,
    uuid:"jyttdhjkl;",
    header: "test header ---",
    content: "test content would recommend using Date.now() (with compatibility shim). It's slightly better because it's shorter & doesn't create a new Date object. However, if you don't want a shim & maximum compatibility, you could use the \"old\" method to get the timestamp in milliseconds",
    createdTimestamp: "2017-01-26",
    modifiedTimestamp: "2017-01-26",
    isDeleted:false,
    scope:{value:2, label:"private"}
    },
    {
        id:1,
        uuid:"jyttdhjkl;",
        header: "test header ---",
        content: "test content would recommend using Date.now() (with compatibility shim). It's slightly better because it's shorter & doesn't create a new Date object. However, if you don't want a shim & maximum compatibility, you could use the \"old\" method to get the timestamp in milliseconds",
        createdTimestamp: "2017-01-26",
        modifiedTimestamp: "2017-01-26",
        isDeleted:false,
        scope:{value:2, label:"private"}
    },
    {
        id:1,
        uuid:"jyttdhjkl;",
        header: "test header ---",
        content: "test content would recommend using Date.now() (with compatibility shim). It's slightly better because it's shorter & doesn't create a new Date object. However, if you don't want a shim & maximum compatibility, you could use the \"old\" method to get the timestamp in milliseconds",
        createdTimestamp: "2017-01-26",
        modifiedTimestamp: "2017-01-26",
        isDeleted:false,
        scope:{value:2, label:"private"}
    }]

const ResponseMapper =() =>{
    return (
        <div>
            <Separator.Separator4/>
            <div className={"jumbotron bg-light"}>
                <h4 className={"text-center"}>Search result</h4>
                {response.map(PostUtil.PostForSearch)}
            </div>
        </div>
    );
}

const FilterPost = () => {

    return (
        <div className="jumbotron">

            <h4>Post search</h4>
            <hr/>

            <SearchPattern.FromAndTo label="Search by creating date"/>
            <hr/>

            <SearchPattern.TextSimple label="Search by text containing" ph="label"/>
            <SearchPattern.CheckBox3 id="1" l1={"in header"} l2={"in main content"} l3={"in comments"}/>
            <hr/>

            <SearchPattern.TextSimple label="Search by commentators ids" ph="ex. 1,23,5"/>
            <hr/>

            <SearchPattern.ScopeCheckBox/>
            <hr/>

            <SearchPattern.SearchButton/>

            <ResponseMapper/>
        </div>
    );
}

export default FilterPost;