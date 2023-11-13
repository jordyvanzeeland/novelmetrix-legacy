import React, { useEffect, useState } from 'react';

const Challenge = (props) => {
    const [challenge, setChallenge] = useState(0);
    const [challengePercentage, setChallengePercentage] = useState(0)

    const getData = async () => {
        const data = await import("./Data.js");
        const stats = await data.getStats(props.year);
        const yearchallenge = await data.getChallenge(props.year);
        setChallenge(yearchallenge ? yearchallenge[0].nrofbooks : 0);
        setChallengePercentage(Math.round((stats.totalbooks / yearchallenge[0].nrofbooks) * 100, 0))
    }

    useEffect(() => {
        getData();
    }, [props.year])

    return (
        <React.Fragment>
            {challenge && challenge !== 0 ?
                <div className="stat-block challenge" style={{ marginBottom: '20px' }}>
                    <span className="block_name">Book Challenge ({challenge} boeken)</span>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: challengePercentage + '%' }} aria-valuenow={challengePercentage} aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar-number">{challengePercentage}%</div>
                        </div>
                    </div>
                </div>
                : ''}
        </React.Fragment>
    )
}

export default Challenge;