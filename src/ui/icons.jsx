import React from "react";

function ProppedSVG(props) {
    return <svg className="i-search" viewBox="0 0 32 32" width={props.size=="large"?64:props.size=="medium"?48:props.size=="small"?32:props.size=="extra-small"?24:32} height={props.size=="large"?64:props.size=="medium"?48:props.size=="small"?32:props.size=="extra-small"?24:32} fill="none" stroke={props.disabled?"grey":"white"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        {props.children}
    </svg>
}

export function Search(props) { 
    return <ProppedSVG {...props}>
    <circle cx="14" cy="14" r="12"></circle>
    <path d="M23 23 L30 30"></path>
    </ProppedSVG>
}

export function Close(props) { 
    return <ProppedSVG {...props}>
    <path d="M2 30 L30 2 M30 30 L2 2"></path>
    </ProppedSVG>; 
}

export function Plus(props) { 
    return <ProppedSVG {...props}>
    <path d="M16 2 L16 30 M2 16 L30 16"></path>
    </ProppedSVG>; 
}

export function Minus(props) { 
    return <ProppedSVG {...props}>
    <path d="M2 16 L30 16"></path>
    </ProppedSVG>; 
}

export function Play(props) { 
    return <ProppedSVG {...props}>
    <path d="M10 2 L10 30 24 16 Z"></path>
    </ProppedSVG>; 
}

export function Pause(props) { 
    return <ProppedSVG {...props}>
    <path d="M23 2 L23 30 M9 2 L9 30"></path>
    </ProppedSVG>; 
}

export function Backwards(props) { 
    return <ProppedSVG {...props}>
    <path d="M16 2 L2 16 16 30 16 16 30 30 30 2 16 16 Z"></path>
    </ProppedSVG>; 
}

export function Forwards(props) { 
    return <ProppedSVG {...props}>
    <path d="M16 2 L30 16 16 30 16 16 2 30 2 2 16 16 Z"></path> 
    </ProppedSVG>; 
}

export function Move(props) { 
    return <ProppedSVG {...props}>
    <path d="M3 16 L29 16 M16 3 L16 29 M12 7 L16 3 20 7 M12 25 L16 29 20 25 M25 12 L29 16 25 20 M7 12 L3 16 7 20"></path>
    </ProppedSVG>; 
}

export function ZoomIn(props) { 
    return <ProppedSVG {...props}>
    <circle cx="14" cy="14" r="12"></circle>
    <path d="M23 23 L30 30"></path>
    <path d="M14 8 L14 20 M8 14 L20 14"></path>
    </ProppedSVG>; 
}

export function ZoomOut(props) { 
    return <ProppedSVG {...props}>
    <circle cx="14" cy="14" r="12"></circle>
    <path d="M23 23 L30 30"></path>
    <path d="M8 14 L20 14"></path>
    </ProppedSVG>; 
}

export function ZoomReset(props) { 
    return <ProppedSVG {...props}>
    <circle cx="14" cy="14" r="12"></circle>
    <path d="M23 23 L30 30"></path>
    <path d="M9 12 L9 9 12 9 M16 9 L19 9 19 12 M9 16 L9 19 12 19 M19 16 L19 19 16 19"></path>
    </ProppedSVG>; 
}

export function Fullscreen(props) { 
    return <ProppedSVG {...props}>
    <path d="M4 12 L4 4 12 4 M20 4 L28 4 28 12 M4 20 L4 28 12 28 M28 20 L28 28 20 28"></path>
    </ProppedSVG>; 
}

export function FulllscreenExit(props) { 
    return <ProppedSVG {...props}>
    <path d="M4 12 L12 12 12 4 M20 4 L20 12 28 12 M4 20 L12 20 12 28 M28 20 L20 20 20 28"></path>
    </ProppedSVG>; 
}

export function Star(props) { 
    return <ProppedSVG {...props}>
    <path d="M16 2 L20 12 30 12 22 19 25 30 16 23 7 30 10 19 2 12 12 12 Z"></path>
    </ProppedSVG>; 
}

export function Checkmark(props) { 
    return <ProppedSVG {...props}>
    <path d="M2 20 L12 28 30 4"></path>
    </ProppedSVG>; 
}

export function ChevronTop(props) { 
    return <ProppedSVG {...props}>
    <path d="M30 20 L16 8 2 20"></path>
    </ProppedSVG>; 
}

export function ChevronRight(props) { 
    return <ProppedSVG {...props}>
    <path d="M12 30 L24 16 12 2"></path>
    </ProppedSVG>; 
}

export function ChevronBottom(props) { 
    return <ProppedSVG {...props}>
    <path d="M30 12 L16 24 2 12"></path>
    </ProppedSVG>; 
}

export function ChevronLeft(props) { 
    return <ProppedSVG {...props}>
    <path d="M20 30 L8 16 20 2"></path>
    </ProppedSVG>; 
}

export function ArrowTop(props) { 
    return <ProppedSVG {...props}>
    <path d="M6 10 L16 2 26 10 M16 2 L16 30"></path>
    </ProppedSVG>; 
}

export function ArrowRight(props) { 
    return <ProppedSVG {...props}>
    <path d="M22 6 L30 16 22 26 M30 16 L2 16"></path>
    </ProppedSVG>; 
}

export function ArrowBottom(props) { 
    return <ProppedSVG {...props}>
    <path d="M6 22 L16 30 26 22 M16 30 L16 2"></path>
    </ProppedSVG>; 
}

export function ArrowLeft(props) { 
    return <ProppedSVG {...props}>
    <path d="M10 6 L2 16 10 26 M2 16 L30 16"></path>
    </ProppedSVG>; 
}

export function CaretTop(props) { 
    return <ProppedSVG {...props}>
    <path d="M30 22 L16 6 2 22 Z"></path>
    </ProppedSVG>; 
}

export function CaretRight(props) { 
    return <ProppedSVG {...props}>
    <path d="M10 30 L26 16 10 2 Z"></path>
    </ProppedSVG>; 
}

export function CaretBottom(props) { 
    return <ProppedSVG {...props}>
    <path d="M30 10 L16 26 2 10 Z"></path>
    </ProppedSVG>; 
}

export function CaretLeft(props) { 
    return <ProppedSVG {...props}>
    <path d="M22 30 L6 16 22 2 Z"></path>
    </ProppedSVG>; 
}

export function Start(props) { 
    return <ProppedSVG {...props}>
    <path d="M8 2 L8 16 22 2 22 30 8 16 8 30"></path>
    </ProppedSVG>; 
}

export function End(props) { 
    return <ProppedSVG {...props}>
    <path d="M24 2 L24 16 10 2 10 30 24 16 24 30"></path>
    </ProppedSVG>; 
}

export function Eject(props) { 
    return <ProppedSVG {...props}>
    <path d="M30 18 L16 5 2 18Z M2 25 L30 25"></path>
    </ProppedSVG>; 
}

export function Mute(props) { 
    return <ProppedSVG {...props}>
    <path d="M20 16 C20 8 15 2 15 2 L8 10 2 10 2 22 8 22 15 30 C15 30 20 24 20 16 Z"></path>
    </ProppedSVG>; 
}

export function Volume(props) { 
    return <ProppedSVG {...props}>
    <path d="M20 16 C20 8 15 2 15 2 L8 10 2 10 2 22 8 22 15 30 C15 30 20 24 20 16 Z M21 2 C21 2 25 6 25 16 25 26 21 30 21 30 M27 4 C27 4 30 8 30 16 30 24 27 28 27 28"></path>
    </ProppedSVG>; 
}

export function Ban(props) { 
    return <ProppedSVG {...props}>
    <circle cx="16" cy="16" r="14"></circle>
    <path d="M6 6 L26 26"></path>
    </ProppedSVG>; 
}

export function Flag(props) { 
    return <ProppedSVG {...props}>
    <path d="M6 2 L6 30 M6 6 L26 6 20 12 26 18 6 18"></path>
    </ProppedSVG>; 
}

export function Options(props) { 
    return <ProppedSVG {...props}>
    <path d="M28 6 L4 6 M28 16 L4 16 M28 26 L4 26 M24 3 L24 9 M8 13 L8 19 M20 23 L20 29"></path>
    </ProppedSVG>; 
}

export function Settings(props) { 
    return <ProppedSVG {...props}>
    <path d="M13 2 L13 6 11 7 8 4 4 8 7 11 6 13 2 13 2 19 6 19 7 21 4 24 8 28 11 25 13 26 13 30 19 30 19 26 21 25 24 28 28 24 25 21 26 19 30 19 30 13 26 13 25 11 28 8 24 4 21 7 19 6 19 2 Z"></path>
    <circle cx="16" cy="16" r="4"></circle>
    </ProppedSVG>; 
}

export function Heart(props) { 
    return <ProppedSVG {...props}>
    <path d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z"></path>
    </ProppedSVG>; 
}

export function Clock(props) { 
    return <ProppedSVG {...props}>
    <circle cx="16" cy="16" r="14"></circle>
    <path d="M16 8 L16 16 20 20"></path>
    </ProppedSVG>; 
}

export function Menu(props) { 
    return <ProppedSVG {...props}>
    <path d="M4 8 L28 8 M4 16 L28 16 M4 24 L28 24"></path>
    </ProppedSVG>; 
}

export function Msg(props) { 
    return <ProppedSVG {...props}>
    <path d="M2 4 L30 4 30 22 16 22 8 29 8 22 2 22 Z"></path>
    </ProppedSVG>; 
}

export function Photo(props) { 
    return <ProppedSVG {...props}>
    <path d="M20 24 L12 16 2 26 2 2 30 2 30 24 M16 20 L22 14 30 22 30 30 2 30 2 24"></path>
    <circle cx="10" cy="9" r="3"></circle>
    </ProppedSVG>; 
}

export function Camera(props) { 
    return <ProppedSVG {...props}>
    <path d="M2 8 L 9 8 12 4 20 4 23 8 30 8 30 26 2 26 Z"></path>
    <circle cx="16" cy="16" r="5"></circle>
    </ProppedSVG>; 
}

export function Video(props) { 
    return <ProppedSVG {...props}>
    <path d="M22 13 L30 8 30 24 22 19 Z M2 8 L2 24 22 24 22 8 Z"></path>
    </ProppedSVG>; 
}

export function Music(props) { 
    return <ProppedSVG {...props}>
    <path d="M11 25 L11 6 24 3 24 23 M11 13 L24 10"></path>
    <ellipse cx="7" cy="25" rx="4" ry="5"></ellipse>
    <ellipse cx="20" cy="23" rx="4" ry="5"></ellipse>
    </ProppedSVG>; 
}

export function Mail(props) { 
    return <ProppedSVG {...props}>
    <path d="M2 26 L30 26 30 6 2 6 Z M2 6 L16 16 30 6"></path>
    </ProppedSVG>; 
}

export function Home(props) { 
    return <ProppedSVG {...props}>
    <path d="M12 20 L12 30 4 30 4 12 16 2 28 12 28 30 20 30 20 20 Z"></path>
    </ProppedSVG>; 
}

export function User(props) { 
    return <ProppedSVG {...props}>
    <path d="M22 11 C22 16 19 20 16 20 13 20 10 16 10 11 10 6 12 3 16 3 20 3 22 6 22 11 Z M4 30 L28 30 C28 21 22 20 16 20 10 20 4 21 4 30 Z"></path>
    </ProppedSVG>; 
}

export function SignIn(props) { 
    return <ProppedSVG {...props}>
    <path d="M3 16 L23 16 M15 8 L23 16 15 24 M21 4 L29 4 29 28 21 28"></path>
    </ProppedSVG>; 
}

export function SignOut(props) { 
    return <ProppedSVG {...props}>
    <path d="M28 16 L8 16 M20 8 L28 16 20 24 M11 28 L3 28 3 4 11 4"></path>
    </ProppedSVG>; 
}

export function Trash(props) { 
    return <ProppedSVG {...props}>
    <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6"></path>
    </ProppedSVG>; 
}

export function Paperclip(props) { 
    return <ProppedSVG {...props}>
    <path d="M10 9 L10 24 C10 28 13 30 16 30 19 30 22 28 22 24 L22 6 C22 3 20 2 18 2 16 2 14 3 14 6 L14 23 C14 24 15 25 16 25 17 25 18 24 18 23 L18 9"></path>
    </ProppedSVG>; 
}

export function File(props) { 
    return <ProppedSVG {...props}>
    <path d="M6 2 L6 30 26 30 26 10 18 2 Z M18 2 L18 10 26 10"></path>
    </ProppedSVG>; 
}

export function Folder(props) { 
    return <ProppedSVG {...props}>
    <path d="M2 26 L30 26 30 7 14 7 10 4 2 4 Z M30 12 L2 12"></path>
    </ProppedSVG>; 
}

export function FolderOpen(props) { 
    return <ProppedSVG {...props}>
    <path d="M4 28 L28 28 30 12 14 12 10 8 2 8 Z M28 12 L28 4 4 4 4 8"></path>
    </ProppedSVG>; 
}

export function Work(props) { 
    return <ProppedSVG {...props}>
    <path d="M30 8 L2 8 2 26 30 26 Z M20 8 C20 8 20 4 16 4 12 4 12 8 12 8 M8 26 L8 8 M24 26 L24 8"></path>
    </ProppedSVG>; 
}

export function Portfolio(props) { 
    return <ProppedSVG {...props}>
    <path d="M29 17 L29 28 3 28 3 17 M2 8 L30 8 30 16 C30 16 24 20 16 20 8 20 2 16 2 16 L2 8 Z M16 22 L16 18 M20 8 C20 8 20 4 16 4 12 4 12 8 12 8"></path>
    </ProppedSVG>; 
}

export function Book(props) { 
    return <ProppedSVG {...props}>
    <path d="M16 7 C16 7 9 1 2 6 L2 28 C9 23 16 28 16 28 16 28 23 23 30 28 L30 6 C23 1 16 7 16 7 Z M16 7 L16 28"></path>
    </ProppedSVG>; 
}

export function Calendar(props) { 
    return <ProppedSVG {...props}>
    <path d="M2 6 L2 30 30 30 30 6 Z M2 15 L30 15 M7 3 L7 9 M13 3 L13 9 M19 3 L19 9 M25 3 L25 9"></path>
    </ProppedSVG>; 
}

export function Print(props) { 
    return <ProppedSVG {...props}>
    <path d="M7 25 L2 25 2 9 30 9 30 25 25 25 M7 19 L7 30 25 30 25 19 Z M25 9 L25 2 7 2 7 9 M22 14 L25 14"></path>
    </ProppedSVG>; 
}

export function Eye(props) { 
    return <ProppedSVG {...props}>
    <circle cx="17" cy="15" r="1"></circle>
    <circle cx="16" cy="16" r="6"></circle>
    <path d="M2 16 C2 16 7 6 16 6 25 6 30 16 30 16 30 16 25 26 16 26 7 26 2 16 2 16 Z"></path>
    </ProppedSVG>; 
}

export function Bookmark(props) { 
    return <ProppedSVG {...props}>
    <path d="M6 2 L26 2 26 30 16 20 6 30 Z"></path>
    </ProppedSVG>; 
}

export function Tag(props) { 
    return <ProppedSVG {...props}>
    <circle cx="24" cy="8" r="2"></circle>
    <path d="M2 18 L18 2 30 2 30 14 14 30 Z"></path>
    </ProppedSVG>; 
}

export function Lightning(props) { 
    return <ProppedSVG {...props}>
    <path d="M18 13 L26 2 8 13 14 19 6 30 24 19 Z"></path>
    </ProppedSVG>; 
}

export function Activity(props) { 
    return <ProppedSVG {...props}>
    <path d="M4 16 L11 16 14 29 18 3 21 16 28 16"></path>
    </ProppedSVG>; 
}

export function Location(props) { 
    return <ProppedSVG {...props}>
    <circle cx="16" cy="11" r="4"></circle>
    <path d="M24 15 C21 22 16 30 16 30 16 30 11 22 8 15 5 8 10 2 16 2 22 2 27 8 24 15 Z"></path>
    </ProppedSVG>; 
}

export function Export(props) { 
    return <ProppedSVG {...props}>
    <path d="M28 22 L28 30 4 30 4 22 M16 4 L16 24 M8 12 L16 4 24 12"></path>
    </ProppedSVG>; 
}

export function Import(props) { 
    return <ProppedSVG {...props}>
    <path d="M28 22 L28 30 4 30 4 22 M16 4 L16 24 M8 16 L16 24 24 16"></path>
    </ProppedSVG>; 
}

export function Inbox(props) { 
    return <ProppedSVG {...props}>
    <path d="M2 15 L2 25 30 25 30 15 26 7 6 7 Z M2 15 L10 15 C10 15 11 20 16 20 21 20 22 15 22 15 L30 15"></path>
    </ProppedSVG>; 
}

export function Archive(props) { 
    return <ProppedSVG {...props}>
    <path d="M4 10 L4 28 28 28 28 10 M2 4 L2 10 30 10 30 4 Z M12 15 L20 15"></path>
    </ProppedSVG>; 
}

export function Reply(props) { 
    return <ProppedSVG {...props}>
    <path d="M10 6 L3 14 10 22 M3 14 L18 14 C26 14 30 18 30 26"></path>
    </ProppedSVG>; 
}

export function Edit(props) { 
    return <ProppedSVG {...props}>
    <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z"></path>
    </ProppedSVG>; 
}

export function Compose(props) { 
    return <ProppedSVG {...props}>
    <path d="M27 15 L27 30 2 30 2 5 17 5 M30 6 L26 2 9 19 7 25 13 23 Z M22 6 L26 10 Z M9 19 L13 23 Z"></path>
    </ProppedSVG>; 
}

export function Upload(props) { 
    return <ProppedSVG {...props}>
    <path d="M9 22 C0 23 1 12 9 13 6 2 23 2 22 10 32 7 32 23 23 22 M11 18 L16 14 21 18 M16 14 L16 29"></path>
    </ProppedSVG>; 
}

export function Download(props) { 
    return <ProppedSVG {...props}>
    <path d="M9 22 C0 23 1 12 9 13 6 2 23 2 22 10 32 7 32 23 23 22 M11 26 L16 30 21 26 M16 16 L16 30"></path>
    </ProppedSVG>; 
}

export function Send(props) { 
    return <ProppedSVG {...props}>
    <path d="M2 16 L30 2 16 30 12 20 Z M30 2 L12 20"></path>
    </ProppedSVG>; 
}

export function Link(props) { 
    return <ProppedSVG {...props}>
        <path d="M18 8 C18 8 24 2 27 5 30 8 29 12 24 16 19 20 16 21 14 17 M14 24 C14 24 8 30 5 27 2 24 3 20 8 16 13 12 16 11 18 15"></path>
    </ProppedSVG>; 
}

export function Code(props) { 
    return <ProppedSVG {...props}>
        <path d="M10 9 L3 17 10 25 M22 9 L29 17 22 25 M18 7 L14 27"></path>
    </ProppedSVG>; 
}

export function Lock(props) { 
    return <ProppedSVG {...props}>
        <path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9 9 5 16 5 23 5 23 9 23 15 M16 20 L16 23"></path>
        <circle cx="16" cy="24" r="1"></circle>
    </ProppedSVG>; 
}

export function Unlock(props) { 
    return <ProppedSVG {...props}>
        <path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 7 9 3 16 3 23 3 23 8 23 9 M16 20 L16 23"></path>
        <circle cx="16" cy="24" r="1"></circle>
    </ProppedSVG>; 
}

export function Bell(props) { 
    return <ProppedSVG {...props}>
        <path d="M8 17 C8 12 9 6 16 6 23 6 24 12 24 17 24 22 27 25 27 25 L5 25 C5 25 8 22 8 17 Z M20 25 C20 25 20 29 16 29 12 29 12 25 12 25 M16 3 L16 6"></path>
    </ProppedSVG>; 
}

export function Alert(props) { 
    return <ProppedSVG {...props}>
        <path d="M16 3 L30 29 2 29 Z M16 11 L16 19 M16 23 L16 25"></path>
    </ProppedSVG>; 
}

export function Info(props) { 
    return <ProppedSVG {...props}>
        <path d="M16 14 L16 23 M16 8 L16 10"></path>
        <circle cx="16" cy="16" r="14"></circle>
    </ProppedSVG>; 
}

export function CreditCard(props) { 
    return <ProppedSVG {...props}>
        <path d="M2 7 L2 25 30 25 30 7 Z M5 18 L9 18 M5 21 L11 21"></path>
        <path d="M2 11 L2 13 30 13 30 11 Z" fill="currentColor"></path>
    </ProppedSVG>; 
}

export function Cart(props) { 
    return <ProppedSVG {...props}>
        <path d="M6 6 L30 6 27 19 9 19 M27 23 L10 23 5 2 2 2"></path>
        <circle cx="25" cy="27" r="2"></circle>
        <circle cx="12" cy="27" r="2"></circle>
    </ProppedSVG>; 
}

export function Bag(props) { 
    return <ProppedSVG {...props}>
        <path d="M5 9 L5 29 27 29 27 9 Z M10 9 C10 9 10 3 16 3 22 3 22 9 22 9"></path>
    </ProppedSVG>; 
}

export function Gift(props) { 
    return <ProppedSVG {...props}>
        <path d="M4 14 L4 30 28 30 28 14 M2 9 L2 14 30 14 30 9 Z M16 9 C 16 9 14 0 8 3 2 6 16 9 16 9 16 9 18 0 24 3 30 6 16 9 16 9 M16 9 L16 30"></path>
    </ProppedSVG>; 
}

export function External(props) { 
    return <ProppedSVG {...props}>
        <path d="M14 9 L3 9 3 29 23 29 23 18 M18 4 L28 4 28 14 M28 4 L14 18"></path>
    </ProppedSVG>; 
}

export function Reload(props) { 
    return <ProppedSVG {...props}>
        <path d="M29 16 C29 22 24 29 16 29 8 29 3 22 3 16 3 10 8 3 16 3 21 3 25 6 27 9 M20 10 L27 9 28 2"></path>
    </ProppedSVG>; 
}

export function Clipboard(props) { 
    return <ProppedSVG {...props}>
        <path d="M12 2 L12 6 20 6 20 2 12 2 Z M11 4 L6 4 6 30 26 30 26 4 21 4"></path>
    </ProppedSVG>; 
}

export function Filter(props) { 
    return <ProppedSVG {...props}>
        <path d="M2 5 C2 5 6 3 16 3 26 3 30 5 30 5 L19 18 19 27 13 30 13 18 2 5Z"></path>
    </ProppedSVG>; 
}

export function Feed(props) { 
    return <ProppedSVG {...props}>
        <circle cx="6" cy="26" r="2" fill="currentColor"></circle>
        <path d="M4 15 C11 15 17 21 17 28 M4 6 C17 6 26 15 26 28"></path>
    </ProppedSVG>; 
}

export function Moon(props) { 
    return <ProppedSVG {...props}>
        <path d="M14 2C 9 2 3 7 3 15 3 23 9 29 17 29 25 29 30 23 30 18 19 25 7 13 14 2Z"></path>
    </ProppedSVG>; 
}

export function Microphone(props) { 
    return <ProppedSVG {...props}>
        <path d="M16 2 C12 2 12 6 12 6 L12 16 C12 16 12 20 16 20 20 20 20 16 20 16 L20 6 C20 6 20 2 16 2 Z M8 17 C8 17 8 24 16 24 24 24 24 17 24 17 M13 29 L19 29 M16 24 L16 29"></path>
    </ProppedSVG>; 
}

export function Telephone(props) { 
    return <ProppedSVG {...props}>
        <path d="M3 12 C3 5 10 5 16 5 22 5 29 5 29 12 29 20 22 11 22 11 L10 11 C10 11 3 20 3 12 Z M11 14 C11 14 6 19 6 28 L26 28 C26 19 21 14 21 14 L11 14 Z"></path>
        <circle cx="16" cy="21" r="4"></circle>
    </ProppedSVG>; 
}

export function Desktop(props) { 
    return <ProppedSVG {...props}>
        <path d="M10 29 C10 29 10 24 16 24 22 24 22 29 22 29 L10 29 Z M2 6 L2 23 30 23 30 6 2 6 Z"></path>
    </ProppedSVG>; 
}

export function Mobile(props) { 
    return <ProppedSVG {...props}>
        <path d="M21 2 L11 2 C10 2 9 3 9 4 L9 28 C9 29 10 30 11 30 L21 30 C22 30 23 29 23 28 L23 4 C23 3 22 2 21 2 Z M9 5 L23 5 M9 27 L23 27"></path>
    </ProppedSVG>; 
}

export function EllipsisHorizontal(props) { 
    return <ProppedSVG {...props}>
        <circle cx="7" cy="16" r="2"></circle>
        <circle cx="16" cy="16" r="2"></circle>
        <circle cx="25" cy="16" r="2"></circle>
    </ProppedSVG>; 
}

export function EllipsisVertical(props) { 
    return <ProppedSVG {...props}>
        <circle cx="16" cy="7" r="2"></circle>
        <circle cx="16" cy="16" r="2"></circle>
        <circle cx="16" cy="25" r="2"></circle>
    </ProppedSVG>; 
}