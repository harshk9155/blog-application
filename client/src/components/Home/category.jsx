import { Button, Table, TableCell, TableHead, TableRow, TableBody, styled, Typography } from '@mui/material';
import { categories } from '../../constants/data';
import { Link, useSearchParams } from 'react-router-dom';

// ✅ FIX 1: Create Blog button — properly spaced
const StyledButton = styled(Button)`
  margin: 16px auto;
  width: 85%;
  display: block;
  background: #1976d2;
  color: #fff;
  font-weight: 600;
  letter-spacing: 1px;
  &:hover {
    background: #1560b0;
  }
`;

// ✅ FIX 2: Clean table — removed the duplicate nested <TableBody> which caused layout bugs
const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

// ✅ FIX 3: Active category gets highlighted
const CategoryCell = styled(TableCell)`
  cursor: pointer;
  font-size: 14px;
  padding: 12px 16px;
  transition: background 0.15s;
  &:hover {
    background: #e3f2fd;
    color: #1976d2;
  }
`;

const ActiveCell = styled(CategoryCell)`
  background: #e3f2fd;
  color: #1976d2;
  font-weight: 600;
`;

const Category = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <>
            {/* Create Blog button links to /create with current category */}
            <StyledLink to={`/create?category=${category || ''}`}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </StyledLink>

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 700, color: '#555', fontSize: '13px', letterSpacing: '0.5px' }}>
                            CATEGORIES
                        </TableCell>
                    </TableRow>
                </TableHead>

                {/* ✅ FIX 4: Only ONE TableBody — the original had two nested TableBody tags which is invalid HTML */}
                <TableBody>
                    {/* All categories row */}
                    <TableRow>
                        {!category ? (
                            <ActiveCell>
                                <StyledLink to="/home">All categories</StyledLink>
                            </ActiveCell>
                        ) : (
                            <CategoryCell>
                                <StyledLink to="/home">All categories</StyledLink>
                            </CategoryCell>
                        )}
                    </TableRow>

                    {/* Category rows */}
                    {categories.map(item => (
                        <TableRow key={item.id}>
                            {category === item.Type ? (
                                <ActiveCell>
                                    <StyledLink to={`/home?category=${item.Type}`}>
                                        {item.Type}
                                    </StyledLink>
                                </ActiveCell>
                            ) : (
                                <CategoryCell>
                                    <StyledLink to={`/home?category=${item.Type}`}>
                                        {item.Type}
                                    </StyledLink>
                                </CategoryCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </>
    );
};

export default Category;
