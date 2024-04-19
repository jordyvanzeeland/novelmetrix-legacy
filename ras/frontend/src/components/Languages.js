import React, { useEffect, useState } from 'react';

const Languages = (props) => {
    const [languageBooks, setLanguageBooks] = useState([])

    const getData = async () => {
        const data = await import("./Data.js")
        const languagebooks = await data.getLanguagesBooks(props.year)
        setLanguageBooks(languagebooks);
    }

    useEffect(() => {
        getData();
    }, [props.year])

    return (
        <React.Fragment>
            <div className="ratings">
                <span className="block_name">Talen</span>
                <table className="ratingstable responsive nowrap" width="100%">
                    <thead>
                        <tr>
                            <th>language</th>
                            <th>count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {languageBooks.map(language => {
                            return (
                            <tr>
                                <td><span className={`flag-icon flag-icon-${language.lang == 'en' ? 'gb' : language.lang} mx3`} /> {language.name}</td>
                                <td style={{textAlign: 'right'}}>{language.count}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default Languages;