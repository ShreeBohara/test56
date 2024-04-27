import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const responseCard = ({data}) => {
    
  return (
    <div className="ResponseSet">
        {
            data && data.map((prac, index) => (
                <Box sx={{ maxWidth: 275, padding: 1 }}>
                    <Card variant="outlined">
                        <React.Fragment>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="red" gutterBottom>
                                    Question
                                </Typography>

                                <Typography variant="h6" component="div">
                                    {prac.question}
                                </Typography>
                                <Typography sx={{ mt: 1.5 }} color="green">
                                    Answer
                                </Typography>
                                <Typography variant="body2">
                                    {prac.answer}
                                    <br />
                                </Typography>
                            </CardContent>
                        </React.Fragment>
                    </Card>
                </Box>
            ))
        }
        
    </div>
  )
}

export default responseCard
