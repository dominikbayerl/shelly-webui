import { rest } from 'msw'
import * as settings from './shellyswitch-settings.json';
import * as status from './shellyswitch-status.json';

export const handlers = [
    rest.get('http://shellyswitch-*/status', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(status)
        );
    }),
    rest.get('http://shellyswitch-*/settings', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(settings)
        );
    }),
    rest.post('http://shellyswitch-*/roller/*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "state": "stop",
                "power": 0,
                "is_valid": false,
                "safety_switch": false,
                "overtemperature": false,
                "stop_reason": "normal",
                "last_direction": "stop",
                "current_pos": 90,
                "calibrating": false,
                "positioning": true,
            })
        )
    }),
]
