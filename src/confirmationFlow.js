import {
    createMachine,
    state,
    transition,
    interpret,
    invoke,
    reduce
} from 'robot3';

const deleteData = async () => {
    return new Promise((resolve, reject) => {
        console.log('Beginning Deletion....');
        setTimeout(() => {
            console.log('Done Deleting');
            // resolve();
            reject('Oops!!');
        }, 1000);
    });
};

const confirmationFlow = createMachine({
    initial: state(
        transition(
            'begin',
            'confirming',
            reduce((context, event) => {
                return {
                    ...context,
                    onCommit: event.onCommit
                };
            })
        )
    ),
    confirming: state(
        transition('confirm', 'loading'),
        transition('cancel', 'initial')
    ),
    loading: invoke(
        (context, event) => context.onCommit(context, event),
        transition('done', 'initial'),
        transition('error', 'confirming'),
        reduce((context, event) => {
            return {
                ...context,
                error: event.error
            };
        })
    )
});

// interacting with the confirmation modal machine
const service = interpret(confirmationFlow, () => {
    console.log('state has been changed to: ', service.machine.current);
});

service.send('begin');
service.send('cancel');

export { confirmationFlow };
