from settings import *
import hashlib

FACEBOOK_APP_ID = os.environ.get("FACEBOOK_APP_ID")
FACEBOOK_APP_SECRET = os.environ.get("FACEBOOK_APP_SECRET")

def get_cookie(request):
    cookie = request.cookies.get('fbs_%s' % FACEBOOK_APP_ID)
    fb_dict = dict(item.split('=') for item in cookie.split('&'))
    cookie_sig = fb_dict['sig']
    del fb_dict['sig']

    if hashlib.md5(''.join(['%s=%s' % (k, v) for k, v in sorted(fb_dict.iteritems())]) + FACEBOOK_APP_SECRET).hexdigest() == cookie_sig:
        return fb_dict
    else:
        raise Exception('Cookie is not valid')


