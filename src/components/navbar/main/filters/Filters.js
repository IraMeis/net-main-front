import React, { useState, useEffect } from "react";

import UserService from "../../../../services/user.service";
import EventBus from "../../../../common/EventBus";
import Separator from "../Separator";
import FilterPost from "./FilterPost";
import FilterUser from "./FilterUser";
import StatisticUser from "./StatisticUser";

const Filters = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);

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