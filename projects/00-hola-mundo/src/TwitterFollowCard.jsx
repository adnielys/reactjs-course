import { useState } from "react"

export function TwitterFollowCard ({children, username='unknown', name, isFollowing}){

    const [isFollowingState, setIsFollowingState] = useState(isFollowing)
    const imgSrc = 'https://unavatar.io/${username}'    
    const text = isFollowingState ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowingState ? 'tw-followCard-button is-following' : 'tw-followCard-button'
    
    const handlerClick = () => {
        setIsFollowingState(!isFollowingState)
    }

    return (
        <article className='tw-followCard'>
        <header className='tw-followCard-header'>
            <img className='tw-followCard-avatar' alt="El avatar de midudev" src={imgSrc}/>
            <div className='tw-followCard-info'>
                <strong>{children}</strong>
                <span className='tw-followCard-userName'>@{username}</span>
            </div>
        </header>
        <aside>
            <button className={buttonClassName} onClick={handlerClick}>
               <span className='tw-followCard-text'> {text} </span>
               <span className='tw-followCard-stopFollow'>Dejar de seguir</span>
            </button>
        </aside>
    </article>
    )
}