import React, { Component } from 'react'
import LastMessage from './../ui/messagelist/LastMessage'
import NewMessageForm from './../ui/messagelist/NewMessageForm'
import CurrentPrice from './../ui/messagelist/CurrentPrice'
import { connect } from 'react-redux'
import {addMessage} from './../ui/messagelist/MessageListActions'


class LastMessageScreen extends Component {
    render() {
        return(
            <main className="container">
                <div>
                    <LastMessage lastMessage={this.props.lastMessage}/>
                    <CurrentPrice currentPrice={this.props.price} />
                    <NewMessageForm addMessage={this.props.addMessage}/>
                </div>
            </main>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        lastMessage: state.message.lastMessage,
        price: state.message.price
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (name) => {
            event.preventDefault();
            dispatch(addMessage(name))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LastMessageScreen);
