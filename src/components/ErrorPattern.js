const ErrorPattern = (props) => {
    const err = JSON.parse(localStorage.getItem("error"));
    localStorage.removeItem("error");
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{
                    props.message != null ?
                    props.message : (err != null ? err : "Page not found")
                }
                </h3>
            </header>
        </div>
    );
};

export default ErrorPattern;