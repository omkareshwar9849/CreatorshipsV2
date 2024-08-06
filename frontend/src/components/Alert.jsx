import React from 'react';

function Alert(props) {
    const capitalize = (msg) => {
        if (msg === "danger") {
            msg = "error";
        }
        const lower = msg.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    const alertTypeClasses = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-100 border-green-400 text-green-700';
            case 'error':
            case 'danger':
                return 'bg-red-100 border-red-400 text-red-700';
            case 'warning':
                return 'bg-yellow-100 border-yellow-400 text-yellow-700';
            case 'info':
                return 'bg-blue-100 border-blue-400 text-blue-700';
            default:
                return '';
        }
    };

    return (
        <div className="h-12">
            {props.alert && (
                <div className={`border-l-4 p-4 ${alertTypeClasses(props.alert.type)} rounded`} role="alert" style={{backgroundColor:'black', color:'#EBD96B'}}>
                    <strong style={{color:'#EBD96B'}}>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
                </div>
            )}
        </div>
    );
}

export default Alert;
