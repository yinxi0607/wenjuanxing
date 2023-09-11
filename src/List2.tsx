import {FC,  useState} from 'react';
import QuestionCard from "./components/QuestionCard.tsx";
import {produce} from "immer";

const List2: FC = () => {
    const [questionList, setQuestionList] = useState([
        {id: 'q1', title: '问卷1', isPublished: false},
        {id: 'q2', title: '问卷2', isPublished: true},
        {id: 'q3', title: '问卷3', isPublished: false},
        {id: 'q4', title: '问卷4', isPublished: true}
    ])

    const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    // useEffect(() => {
    //     console.log('questionList changed', questionList)
    // },[questionList])

    function addItem() {
        setList(
            produce(draft => {
                draft.push(11)
            })
        )
    }

    function add() {
        const r = Math.random().toString().slice(-3)
        setQuestionList(
            // questionList.concat({id: 'q' + r, title: '问卷' + r, isPublished: false})
            produce(draft => {
                    draft.push({id: 'q' + r, title: '问卷' + r, isPublished: false})
                }
            ))
    }

    function deleteQuestion(id: string) {
        setQuestionList(
            // questionList.filter(q => {})
            produce(draft => {
                const index = draft.findIndex(q => q.id === id)
                draft.splice(index, 1)
            })
        )
    }

    function publishQuestion(id: string) {
        setQuestionList(
            // questionList.map(
            //     q => {
            //         if (q.id !==id) return q
            //         return {
            //             ...q,isPublished: true
            //         }
            //     }
            // )

            produce(draft => {
                    const q = draft.find(q => q.id === id)
                    if (q) q.isPublished = true
                }
            )
        )
    }

    return (
        <div>
            <h1>问卷列表页2hello</h1>
            <div>
                {
                    questionList.map(question => {
                        const {id, title, isPublished} = question
                        return (
                            <QuestionCard key={id} id={id} title={title} isPublished={isPublished}
                                          deleteQuestion={deleteQuestion} publishQuestion={publishQuestion}/>
                        )
                    })
                }
            </div>
            <div>
                <button onClick={add}>新增问卷</button>
            </div>
            <div>{JSON.stringify(list)}</div>
            <div>
                <button onClick={addItem}>修改数组</button>
            </div>
        </div>
    );
};

export default List2;