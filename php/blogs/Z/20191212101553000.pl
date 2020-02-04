func_call(Predicate, Result) :-
    Predicate =.. List,
    append(List, [Result], ListWithResult),
    Query =.. ListWithResult,
    call(Query).