import { React, useEffect, useState } from 'react'
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";

export const Pagination = ({ totalPages, currentPage }) => {
    const history = useHistory()

    const changePage = event => {
        const newPage = event.target.dataset.page
        currentPage !== newPage && history.push("/?page=" + newPage) 
    }

    return (
        <>
        {totalPages !== 1 &&
            <ul class="pagination">
                {currentPage != 1 &&
                  <li class="page-item">
                    
                  <Link to={{search: `?page=${+currentPage - 1}`}}>
                          <span class="page-link">Previous</span>
                      </Link>
                  </li>
                }
              
                {
                    [...Array(totalPages).keys()].map(page => (
                        <li class={page + 1 == currentPage ? "page-item active" : "page-item"} onClick={(event) => changePage(event)}><a className="page-link" data-page={page + 1}>{page + 1}</a></li>
                    ))
                }
                
                {currentPage != totalPages &&
                    <li class="page-item">
                        <Link to={{search: `?page=${+currentPage + 1}`}}>
                            <span class="page-link">Next</span>
                        </Link>
                    </li>
                }
            </ul>
        }
        </>  
    )
}