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

            <SearchPattern.CheckBox3Labeled label={"Search by isDeleted"}
                                            l1={"only in not deleted"} l2={"only in deleted"} l3={"no mater"}/>
            <hr/>

            <SearchPattern.CheckBox3Labeled label={"Search by isUser"}
                                            l1={"only in user accounts"} l2={"only in not-user accounts"} l3={"no mater"}/>
            <hr/>

            <SearchPattern.CheckBox1Labeled label={"Search in active at current time"}
                                            l1={"yes"}/>
            <hr/>

            <SearchPattern.SearchButton/>
        </div>
    );
}

export default FilterUser;