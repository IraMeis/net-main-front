import scopes from "../../../../util/scopes.json";

const FromAndTo = (props) => {
  return (
      <div>
          <label>{props.label}</label>
          <div className="form-row">
              <div className="form-group col-md-5">
                  <label htmlFor="inputEmail4">from</label>
                  <input type="date" className="form-control"/>
              </div>
              <div className="form-group col-md-2"/>
              <div className="form-group col-md-5">
                  <label htmlFor="inputPassword4">to</label>
                  <input type="date" className="form-control"/>
              </div>
          </div>
      </div>
  );
}

const TextSimple = (props) =>{
    return (
        <div className="form-group">
            <label htmlFor="inputAddress">{props.label}</label>
            <input type="text" className="form-control" id="inputAddress" placeholder={props.ph}/>
        </div>
    );
}

const ScopeCheckBox = () =>{
    return (
        <div>
            <label>Search in scope</label>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name={`scope`} id="inlineCheckbox1" value="option1"/>
                <label className="form-check-label" htmlFor="inlineCheckbox1">{scopes.p1.visual}</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name={`scope`} id="inlineCheckbox2" value="option2"/>
                <label className="form-check-label" htmlFor="inlineCheckbox2">{scopes.p2.visual}</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name={`scope`} id="inlineCheckbox3" value="option3" />
                <label className="form-check-label" htmlFor="inlineCheckbox3">{scopes.p3.visual}</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name={`scope`} id="inlineCheckbox4" value="option4" />
                <label className="form-check-label" htmlFor="inlineCheckbox4">{scopes.p4.visual}</label>
            </div>
        </div>
    );
}

const SearchButton = () =>{
    return (
        <div className={"float-right"}>
            <button type="button" className="btn btn-outline-dark">Clear result</button>
            <button type="button" className="btn btn-outline-dark border-0" disabled> </button>
            <button type="button" className="btn btn-outline-info">Search</button>
        </div>
    );
}

const CheckBox3 = (props) => {
    return(
        <div>
            <div className="form-check form-check-inline ">
                <input className="form-check-input" type="checkbox" name={`ch3${props.id}`} id="inlineCheckbox1" value="option1"/>
                <label className="form-check-label" htmlFor="inlineCheckbox1">{props.l1}</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name={`ch3${props.id}`} id="inlineCheckbox2" value="option2"/>
                <label className="form-check-label" htmlFor="inlineCheckbox2">{props.l2}</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name={`ch3${props.id}`} id="inlineCheckbox3" value="option3" />
                <label className="form-check-label" htmlFor="inlineCheckbox3">{props.l3}</label>
            </div>
        </div>
    );
}

const Radio3 = (props) => {
    return(
        <div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name={`Radio3${props.id}`} id="flexRadioDefault1"/>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">{props.l1}</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name={`Radio3${props.id}`} id="flexRadioDefault2"/>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">{props.l2}</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name={`Radio3${props.id}`} id="flexRadioDefault3"/>
                <label className="form-check-label" htmlFor="flexRadioDefault3">{props.l3}</label>
            </div>
        </div>
    );
}

const CheckBox1 = (props) => {
    return(
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" name={`ch1${props.id}`} id="inlineCheckbox1" value="option1"/>
                <label className="form-check-label" htmlFor="inlineCheckbox1">{props.l1}</label>
            </div>
    );
}

const Radio3Labeled = (props) => {
  return(
      <div>
          <label>{props.label}</label>
          <Radio3 id={props.id} l1={props.l1} l2={props.l2} l3={props.l3}/>
      </div>
  );
}

const CheckBox1Labeled = (props) => {
    return(
        <div>
            <label>{props.label}</label>
            <CheckBox1 id={props.id} l1={props.l1}/>
        </div>
    );
}
const SearchPattern = {
    FromAndTo,
    TextSimple,
    ScopeCheckBox,
    SearchButton,
    CheckBox3,
    Radio3Labeled,
    CheckBox1,
    CheckBox1Labeled,
}

export default SearchPattern;
