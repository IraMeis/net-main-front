import SearchPattern from "./SearchPattern"

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
        </div>
    );
}

export default FilterUser;