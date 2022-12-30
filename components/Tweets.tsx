import React,{ useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import TweetItem from './TweetItem';
import { loadTweetsThunk } from '../redux/slices/TweetSlice';

type Props = {}

const Tweets = (props: Props) => {
  const tweets = useAppSelector((state) => state.tweet.tweets);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if(!tweets.length){
      dispatch(loadTweetsThunk({limit:20,offset:0}))

    }
    
  }, []);
  return (
    <div>
          {tweets.map(tweet => <TweetItem tweet={tweet} key={tweet.id} />)}
    </div>
  )
}

export default Tweets