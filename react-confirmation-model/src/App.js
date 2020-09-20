import React from 'react';
import { confirmationFlow } from './confirmationFlow';
import { useMachine } from 'react-robot';
import Modal from 'react-modal';

async function customDeleteFunction() {
    return new Promise((resolve) => {
        console.log('Beginning Deletion');
        setTimeout(() => {
            console.log('Done with deleting this shit.. ');
            resolve();
        }, 1000);
    });
}
function App() {
    const [current, send] = useMachine(confirmationFlow);
    return (
        <div className="App">
            <h1>Confirmation Modal</h1>
            Current State: {current.name}
            <button
                onClick={() =>
                    send({
                        type: 'begin',
                        onCommit: (context, event) => customDeleteFunction()
                    })
                }
            >
                Destroy something fucking important
            </button>
            <Modal
                onRequestClose={() => send('cancel')}
                isOpen={
                    current.name === 'confirming' || current.name === 'loading'
                }
            >
                {current.context.error && <div>{current.context.error}</div>}
                Are you sure?
                <button onClick={() => send('cancel')}>Cancel</button>
                <button onClick={() => send('confirm')}>Yes Definitely</button>
            </Modal>
        </div>
    );
}

export default App;
