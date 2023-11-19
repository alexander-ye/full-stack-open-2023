import React, { useState } from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const incrementGood = () => {
        setGood(good + 1)
    }

    const incrementNeutral = () => {
        setNeutral(neutral + 1);
    }

    const incrementBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h2>give feedback</h2>
            <Button label={'good'} handleClick={incrementGood} />
            <Button label={'neutral'} handleClick={incrementNeutral} />
            <Button label={'bad'} handleClick={incrementBad} />
            <Statistics good={good} bad={bad} neutral={neutral} />
        </div>
    )
}

const Button = ({ handleClick, label }) => {
    return (<button onClick={handleClick}>{label}</button>)
}

const Statistics = ({ good, bad, neutral }) => {
    const all = good + bad + neutral
    const average = ((good - bad) / (good + bad + neutral)) || 0
    const positive = (100 * good / (good + bad + neutral)) || 0

    if (all === 0) {
        return (
            <>
                <h2>statistics</h2>
                <p>No feedback given</p>
            </>
        )
    }
    return (
        <>
            <h2>Statistics</h2>
            <table>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={all} />
                <StatisticLine text="average" value={average} />
                <StatisticLine text="positive" value={`${positive} %`} />
            </table>

        </>
    )
}

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}
export default App