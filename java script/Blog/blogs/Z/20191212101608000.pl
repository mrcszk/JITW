klucz_mniejszy_od_wartosci(K-V) :- K < V.
func_call(F,Result):-
    F =.. List,
    append(List,[Result],X),
    Zapytanie =.. X,
    Zapytanie.
include_assoc(_, Assoc, Assoc) :- Assoc == t, !.

include_assoc(Predicate, Assoc, Result) :- 
    foreach( gen_assoc(Key, Assoc, Value), (
        (min_assoc(Assoc, Key, Value) -> (
                del_min_assoc(Assoc, Key, Value, SubAssoc),
                include_assoc(Predicate, SubAssoc, SubResult),
                (func_call(Predicate, Key-Value) -> put_assoc(Key, SubResult, Value, Result) ; true)
            ) ; (
                true
        ))
    )), !.