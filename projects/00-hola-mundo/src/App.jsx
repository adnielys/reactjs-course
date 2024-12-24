import './index.css'
import './App.css'
import './TwitterFollowCard'
import { TwitterFollowCard } from './TwitterFollowCard'


const users = [{
    id:1,
    username: 'midudev',
    name: 'Miguel Angel Duran',
    isFollowing: true
},{
    id:2,
    username: 'midudev',
    name: 'Miguel Angel Duran',
    isFollowing: false
},{
    id:3,
    username: 'midudev',
    name: 'Miguel Angel Duran',
    isFollowing: false
}]

export function App (){
      
    return (
        <div className='app'>
            {
              
                users.map(({id, username, name, isFollowing}) => (
                    <TwitterFollowCard key={id} username={username} isFollowing={isFollowing}>
                        {name}
                    </TwitterFollowCard>
                ))
            }
         
        </div>
       
    )
}