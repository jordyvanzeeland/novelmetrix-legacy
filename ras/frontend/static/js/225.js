"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[225],{3225:(e,t,o)=>{o.r(t),o.d(t,{getAllBooks:()=>s,getBooksPerYearPerGenres:()=>c,getChallenge:()=>n,getCountries:()=>r,getGenresCount:()=>g,getReadingYears:()=>a,getShortestLongestBook:()=>d,getStats:()=>h});const s=()=>fetch("/api/books",{method:"GET"}).then((e=>e.json())).then((e=>e)),h=e=>fetch("/api/books/stats",{method:"GET",headers:{year:e}}).then((e=>e.json())).then((e=>e)),n=e=>fetch("/api/books/challenge",{method:"GET",headers:{year:e}}).then((e=>e.json())).then((e=>e)),a=()=>fetch("/api/books/years",{method:"GET"}).then((e=>e.json())).then((e=>e)),r=e=>fetch("/api/books/countries",{method:"GET",headers:{year:e}}).then((e=>e.json())).then((e=>e)),d=e=>fetch("/api/books/pages/stats",{method:"GET",headers:{year:e}}).then((e=>e.json())).then((e=>e)),c=e=>fetch("/api/books/genres",{method:"GET",headers:{year:e}}).then((e=>e.json())).then((e=>e)),g=e=>fetch("/api/books/genres/count",{method:"GET",headers:{year:e}}).then((e=>e.json())).then((e=>e))}}]);