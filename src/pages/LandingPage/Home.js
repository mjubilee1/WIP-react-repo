import React, { Component } from 'react';
import { inject } from 'mobx-react';
import VideoPlayer from 'react-video-js-player';
import LiveGamerFeed from '../../components/LiveContent/LiveGamerFeed';
import Agents from '../../agents/agents';

@inject('commonStore')
class Home extends Component {
  state = {
    currentStream: null,
    streamKey: null,
  };

  componentDidMount() {
    this.props.commonStore.setPageTitle('Home');
    this.currentStreamData();
  }

  generateStreamKey = () => {
    Agents.streaming
      .createStream()
      .then((response) => {
        const newState = {
          streamKey: response.data.stream_key,
          streamObj: response,
        };
        this.setState(newState);
      })
      .catch((error) => {
        console.log('Error creating stream', error);
      });
  };

  currentStreamData = () => {
    Agents.streaming
      .currentStream()
      .then((response) => {
        const newState = {
          currentStream: response,
        };
        this.setState(newState);
      })
      .catch((error) => {
        console.log('Error getting stream', error);
      });
  };

  render() {
    const { streamKey, currentStream } = this.state;
    const playbackId = currentStream && currentStream.data.playback_ids && currentStream.data.playback_ids[0] ? currentStream.data.playback_ids[0] : null;
    const streamUrl = playbackId && playbackId.id ? `https://stream.mux.com/${playbackId.id}.m3u8` : null;
    const streamStatus = currentStream && currentStream.data && currentStream.data.status ? currentStream.data.status : null;
    return (
      <div>
        <div>
          <button
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Join Team
          </button>
          <h1>This right here will create your stream key. Click the button below.</h1>
          <div className="inline-flex rounded-md shadow">
            <button
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              onClick={this.generateStreamKey}
            >
              Get stream key
            </button>
          </div>
          {streamKey ? (
            <div>
              <div>
                <p level={5}>{streamKey}</p>
              </div>
              <div>
                <p level={4}>
                  Then copy this link into the streaming platform (OBS, XSPLIT, etc ...).
                  <br />
                  <a href="video.warzone.sleepless-gamers.com">video.warzone.sleepless-gamers.com</a>
                </p>
              </div>
              <div>
                <p level={4}>
                  If that does not work try this backup link.
                  <br />
                  <a href="rtmp://global-live.mux.com:5222/app">rtmp://global-live.mux.com:5222/app</a>
                </p>
              </div>
            </div>
          ) : null}
          {streamUrl && streamStatus === 'active' ? (
            <div>
              <VideoPlayer src={streamUrl} width="800" height="500" />
            </div>
          ) : null}
        </div>
        <LiveGamerFeed category="Popular Channels" />
      </div>
    );
  }
}

export default Home;
