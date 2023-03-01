import { getProgramStore } from '@/store/programStore';
import { getGlyphListStore } from '@/store/glyphListStore';

export default {
    'adjust-pos': function (form) {
        const { program } = getProgramStore();
        let { selected } = getGlyphListStore();
        program.ttfManager.adjustGlyfPos(selected, form);
    },
    'adjust-glyph': function (form) {
        const { program } = getProgramStore();
        let { selected } = getGlyphListStore();
        program.ttfManager.adjustGlyf(selected, form);
    },
    'setting-font': function (form) {
        const { program } = getProgramStore();
        let { selected } = getGlyphListStore();
        program.ttfManager.updateGlyf(form, selected[0]);
    },
    'default': () => {},
};