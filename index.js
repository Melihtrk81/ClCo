const sql = require('mssql');

module.exports = async function (context, req) {
    const config = {
        user: 'admin_cico',
        password: 'clouddbpw24.',
        server: 'sqldatabasecico.database.windows.net',
        database: 'CICo',
        options: {
            encrypt: true,
            enableArithAbort: true
        }
    };

    try {
        await sql.connect(config);
        const result = await sql.query('SELECT TOP 1 Text, Author FROM Zitate ORDER BY NEWID()');

        context.res = {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: result.recordset[0]
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: { error: err.message }
        };
    }
};
