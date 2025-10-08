function function_name(parameter1, parameter2) {
    // Function scope, 
    // variables defined in the function can only be accessed within the scope

    // A function can return a value which can be attached to a variable
    // or passed through to another.
    return parameter1 + parameter2
}

const response = function_name(1, 2)
        //^? 3