import React from 'react';

interface Props {
  title: string;
}

function NavLink({ title }: Props) {
  return (
    <a
      href='#responsive-header'
      className='block mt-4 ml-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white'
    >
      {title}
    </a>
  );
}

export default NavLink;
