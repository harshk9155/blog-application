import {Button, TableCell, Table, TableHead, TableRow, TableBody, styled} from '@mui/material';

import { categories } from '../../constants/data';

import { Link, useSearchParams } from 'react-router-dom';

const StyledTable = styled(Table)`
   border: 1px solid rgba(224, 224, 224, 1);

`
const StyledButton =styled(Button)`
   margin:20px;
   width:85%;
   background:#6495ED;
   color:#FFF;

`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`

const Category =() =>
{

    const [searchParams] = useSearchParams(); // to get the query parameter from the url, which is category in this case
    const category = searchParams.get('category');
    return(
        <>
        <StyledLink to={`/create?category=${category || ''}`} >
            <StyledButton variant='contained'>create blog</StyledButton>
        </StyledLink>
        <StyledTable>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <StyledLink to="/home">
                        All categories
                        </StyledLink>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
               <TableBody>
                 {/* category looping */}
                 {categories.map(item => (
                 <TableRow key={item.id}>
                 <TableCell>
                 <StyledLink to={`/home?category=${ item.Type}`}>
                 {item.Type}
                </StyledLink>
                </TableCell>
        </TableRow>
    ))}
</TableBody>
                
            </TableBody>
        </StyledTable>

        </>
    )
}

export default Category;