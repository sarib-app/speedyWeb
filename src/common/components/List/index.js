/* eslint-disable */
import React, { Fragment } from "react";
import Link from "next/link";
import { ListWrapper } from "./list.style";

const List = ({ className, icon, text, link, ...props }) => (
  <ListWrapper className={className}>
    {link ? (
      (<Link href={link}>

        {icon}
        {text}

      </Link>)
    ) : (
      <Fragment>
        {icon}
        {text}
      </Fragment>
    )}
  </ListWrapper>
);

export default List;
