module.exports = {
    // Find the appropriate database to connect to, default to localhost if not found.
    db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/ReactWebpackNode',
    sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',
    google: {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK || "/auth/google/callback"
    }
};
