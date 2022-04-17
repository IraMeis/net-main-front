import SearchPattern from "./SearchPattern"

const FilterPost = () => {

    return (
        <div className="jumbotron">

            <h4>Post search</h4>
            <hr/>

            <SearchPattern.FromAndTo label="Search by creating date"/>
            <hr/>

            <SearchPattern.TextSimple label="Search by text containing" ph="label"/>
            <SearchPattern.CheckBox3 l1={"in header"} l2={"in main content"} l3={"in comments"}/>
            <hr/>

            <SearchPattern.TextSimple label="Search by commentators ids" ph="ex. 1,23,5"/>
            <hr/>

            <SearchPattern.ScopeCheckBox/>
            <hr/>

            <SearchPattern.SearchButton/>
        </div>
    );
}

export default FilterPost;