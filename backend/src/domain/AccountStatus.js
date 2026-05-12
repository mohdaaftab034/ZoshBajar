const AccountStatus = Object.freeze({
    PENDING_VERIFICATION: 'PENDING_VERIFICATION',  // Account created but not yet verified
    ACTIVE: 'ACTIVE',                      // Account is active and in good standing
    SUSPENDED: 'SUSPENDED',         // Account is temporarily suspended
    DEACTIVATED: 'DEACTIVATED',     // Account has been deactivated by the user
    BANNED: 'BANNED',               // Account has been banned due to violations
    CLOSED: 'CLOSED'                // Account has been permanently closed
})

module.exports = AccountStatus;
