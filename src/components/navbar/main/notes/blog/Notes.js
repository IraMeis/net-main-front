import BlogMain from "./BlogMain";
import BlogHead from "./BlogHead";
import Separator from "../../Separator";

const Notes = () => {
  return (
      <div>
          <Separator.Separator1/>
          <div className="jumbotron">
              <BlogHead/>
              <BlogMain/>
          </div>
      </div>
  );
};

export default Notes;
