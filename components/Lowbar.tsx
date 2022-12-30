import React from 'react'
import SidebarRow from './SidebarRow'
import {
    HomeIcon,
    HashtagIcon,
    BellIcon,
    HeartIcon,
    BookmarkIcon,
    UserIcon,
  } from "@heroicons/react/24/outline";
type Props = {}

const Lowbar = (props: Props) => {
  return (
    <div className='w-full flex flex-row justify-between sm:hidden fixed left-0 right-0 bottom-0'>
      <SidebarRow  href="/home"  Icon={HomeIcon} title="Home" />
      <SidebarRow  href="/search" Icon={HashtagIcon} title="Explore" />
      <SidebarRow  href="/" Icon={BellIcon} title="Notifications" />
      <SidebarRow  href="/" Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow  href="/likes" Icon={HeartIcon} title="Likes" />
      <SidebarRow  href="/profile" Icon={UserIcon} title="Profile" />
    </div>
  )
}

export default Lowbar