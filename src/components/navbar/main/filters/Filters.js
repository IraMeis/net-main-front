import React, { useState, useEffect } from "react";

import Separator from "../Separator";
import FilterPost from "./FilterPost";
import FilterUser from "./FilterUser";
import StatisticUser from "./StatisticUser";

const Filters = () => {
    return (
        <div className="container">
            <Separator.Separator1/>
            <FilterPost/>
            <FilterUser/>
            <StatisticUser/>
        </div>
    );
};

export default Filters;