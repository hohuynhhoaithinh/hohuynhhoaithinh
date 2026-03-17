'use client'

import {studioUrl} from '@/sanity/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useSyncExternalStore} from 'react'
import cover from './cover.png'

const subscribe = () => () => {}
function useAfterHydration<Snapshot>(
  getSnapshot: () => Snapshot,
  serverSnapshot: Snapshot,
): Snapshot {
  return useSyncExternalStore<Snapshot>(subscribe, getSnapshot, () => serverSnapshot)
}

export default function IntroTemplate() {
  return null;
}

function Box({circleTitle, element}: {circleTitle: string; element: React.JSX.Element}) {
  return (
    <li className="mt-2 grid grid-flow-col grid-rows-1 place-content-start gap-3">
      <div className="row-span-3 select-none">
        <div className="relative flex h-5 w-5 select-none items-center justify-center rounded-full bg-gray-200 p-3 text-center">
          {circleTitle}
        </div>
      </div>
      {element}
    </li>
  )
}

function BlueLink({href, text}: {href: string; text: string}) {
  return (
    <a
      href={href}
      className="text-blue-500 underline hover:text-blue-800"
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </a>
  )
}

const RemoveBlock = ({url}: {url: string}) => (
  <a className="hover:text-blue-800" href={url} target="_blank" rel="noreferrer">
    How to remove this block?
  </a>
)

function getGitProvider() {
  switch (process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER) {
    case 'gitlab':
      return 'GitLab'
    case 'bitbucket':
      return 'Bitbucket'
    default:
      return 'GitHub'
  }
}
